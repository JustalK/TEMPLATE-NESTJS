import moduleAlias from 'module-alias';
import path from 'path';

const rootPath = path.resolve(__dirname, '..', '..', 'dist');
moduleAlias.addAliases({
  '@src': rootPath,
  '@interfaces': path.resolve(__dirname, 'interfaces'),
});
