import {createContext} from 'react';
import sanityClient from '@sanity/client';

const client = sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: 'x8fjlapx',
  dataset: 'production',
  useCdn: true
  // UseCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
});

export const SanityContext = createContext(client);

export function fetchQuery(query, params) {
  return client.fetch(query, params);
}

export default client;
