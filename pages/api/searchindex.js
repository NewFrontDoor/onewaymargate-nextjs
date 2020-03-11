import FlexSearch from 'flexsearch';
import sanity from '../../lib/sanity';

const coresearch = {
  encode: 'advanced',
  tokenize: 'forward',
  async: false,
  worker: false,
  depth: 10,
  stemmer: 'en',
  filter: 'en'
};

const pagesQuery = `
*[_type == "page"] {
  ...,
    body[]{
      ...,
      _type == 'reference' => @-> {
        ...,
        blocks[] {
          ...,
          _type == 'reference' => @ ->,
          "image": image.asset->url,
          "link": link[0].url
        }
      },
      markDefs[] {
        ...,
        _type == 'internalLink' => {
            'slug': @.reference->slug.current
        }
      }
    },
    'mainImage': mainImage.asset->url,
    'id': _id,
  'pathname': '/' + slug.current
}
`;

const sermonQuery = `
  *[_type == "sermons"] {
    "key": _id,
    title,
    _id,
    preachedDate,
    "preacher": preacher->name,
    "series": series->title,
    "book": passage,
    "image": series->image,
    "url": "https://s3.us-west-2.amazonaws.com/sermons.onewaymargate.org/" + file,
    "slug": slug.current
  } | order(preachedDate desc)
  `;

const sermonflex = new FlexSearch({
  coresearch,
  doc: {
    id: '_id',
    field: ['title', 'preacher', 'book', 'series']
  }
});

const flex = new FlexSearch({
  coresearch,
  doc: {
    id: '_id',
    field: ['title', 'searchbody', 'slug']
  }
});

async function fetchSermonData() {
  const result = await sanity.fetch(sermonQuery);
  return result;
}

async function fetchMainData() {
  const result = await sanity.fetch(pagesQuery);
  const idxdata = result.map(page => {
    return {
      ...page,
      slug: page.slug.current,
      searchbody: page.body
        .map(item => item.children)
        .flat()
        .map(child => child?.text ?? '')
        .join(' ')
    };
  });
  return idxdata;
}

export default async (req, res) => {
  const sermonIndex = await fetchSermonData();
  await sermonflex.add(sermonIndex);
  const exportSermonData = await sermonflex.export();

  const mainIndex = await fetchMainData();
  await flex.add(mainIndex);
  const exportData = await flex.export();

  res.status(200).json({
    sermonIndexExport: exportSermonData,
    mainIndexExport: exportData
  });
};
