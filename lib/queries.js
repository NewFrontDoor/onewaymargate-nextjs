const mainQuery = `
*[_type == "main"][0] {
  content[]->{
    actions[]{
      "name": _type,
      "url": page->slug.current,
      label,
      "dynamicLink": page->link,
      "latestSermonSlug": *[_type == "sermons"] | order(preachedDate desc)[0].slug.current,
    },
    background,
    blurb[]{
      ...,
      _type == 'reference' => @-> {
        ...,
        blocks[] {
          ...,
          _type == 'reference' => @ -> {
            ...,
            'image': mainImage.asset->url,
            'header': title,
            'link': slug.current
          }
        }
      },
      markDefs[] {
        ...,
        _type == 'internalLink' => {
            'slug': @.reference->slug.current
        }
      }
    },
    details,
    heading,
    styling,
    location
  }
}
`;

const menuQuery = `
*[_type == "main"][0] {
  menuitems[]{
    text,
    childpages[]->{
      title,
      slug,
      'pathname': '/' + slug.current
    }
  }
}
`;

const pageQuery = (slug) => `
*[_type == "page" && slug.current == '${slug}'][0] {
  ...,
  body[]{
    ...,
    _type == 'reference' => @-> {
      ...,
      blocks[] {
        ...,
        _type == 'reference' => @ -> {
          ...,
          'image': mainImage.asset->url,
          'header': title,
          'link': slug.current
        }
      }
    },
    markDefs[] {
      ...,
      _type == 'internalLink' => {
          'slug': @.reference->slug.current
      },
      _type == 'asset' => {
          'url': @.reference->file.asset->url
      }
    }
  },
  'mainImage': mainImage.asset->url
}
`;

const pagesQuery = `
*[_type == "page"] {
  ...,
  body[]{
    ...,
    _type == 'reference' => @-> {
      ...,
      blocks[] {
        ...,
        _type == 'reference' => @ -> {
          ...,
          'image': mainImage.asset->url,
          'header': title,
          'link': slug.current
        }
      }
    },
    markDefs[] {
      ...,
      _type == 'internalLink' => {
          'slug': @.reference->slug.current
      }
    }
  },
  'mainImage': mainImage.asset->url
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
  "url": "https://sermons.onewaymargate.org/" + file,
  "slug": slug.current,
  "image": series->image
} | order(preachedDate desc)
`;

const sermonSlugQuery = (slug) => `
*[_type == "sermons" && slug.current == '${slug}'][0] {
  "key": _id,
  title,
  _id,
  preachedDate,
  "preacher": preacher -> name,
  "series": series -> title,
  "book": passage,
  "url": "https://sermons.onewaymargate.org/" + file,
  "slug": slug.current
}
`;

const seriesQuery = `
  *[_type == "series"] {
    ...,
    "id": _id,
    title,
    image,
    "link": ''
  }|order(_updatedAt desc)
`;

const defaultQuery = `
  *[_id == "global-config"][0] {
    "image": logo
  }
`;

export { mainQuery, menuQuery, pageQuery, sermonQuery, sermonSlugQuery, seriesQuery, pagesQuery, defaultQuery };
