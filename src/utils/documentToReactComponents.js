import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default (doc) => {
    return documentToReactComponents(doc);
}
