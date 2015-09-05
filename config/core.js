var config = module.exports;

// Directory to store uploaded files
config.UPLOAD_DIRECTORY = './files';

// Hashids Salt
// --Changing this may cause conflicts if there are already uploaded files--
config.SALT = 'CHANGE ME'

// Filename key length
// Can be changed without affecting existing files
// Default: 6
config.KEY_LENGTH = 6;

// Database filename
// Only SQLITE is supported right now
config.DB_FILENAME = './database.db';

// Maximum number of files to upload at once
// Default: 10
config.MAX_UPLOAD_COUNT = 10;

// Maximum file size (in bytes)
// Default: 50MB (50000000)
config.MAX_UPLOAD_SIZE = 50000000;

// URL to prepend to output (include trailing slash)
config.URL = 'http://localhost:3000/';

// Two dot extensions
config.COMPLEX_EXTS = [
	'.tar.gz',
	'.tar.bz',
	'.tar.bz2',
	'.tar.xz',
	'.user.js'
];
