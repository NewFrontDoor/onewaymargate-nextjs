const mainQuery = `
*[_type == "main"][0] {
  content[]->{
    actions[]{
      "name": _type,
      "url": page->slug.current,
      label
    },
    background,
    blurb,
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

const pageQuery = slug => `
*[_type == "page" && '${slug}' match slug.current][0] {
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
  "url": file,
  "slug": slug.current,
  "image": series->image
} | order(preachedDate desc)
`;

const sermonSlugQuery = slug => `
*[_type == "sermons" && slug.current == '${slug}'][0] {
  "key": _id,
  title,
  _id,
  preachedDate,
  "preacher": preacher -> name,
  "series": series -> title,
  "book": passage,
  "url": "https://s3.us-west-2.amazonaws.com/sermons.onewaymargate.org/" + file,
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

export {
  mainQuery,
  menuQuery,
  pageQuery,
  sermonQuery,
  sermonSlugQuery,
  seriesQuery,
  defaultQuery
};
