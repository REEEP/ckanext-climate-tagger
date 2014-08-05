ckanext-climate-tagger
======================

The reegle Climate Tagger CKAN Extension provides suggested tags for climate compatible content (for CKAN) by introducing an additional field to the add/edit resource form that displays suggested tags for reegles Tagging API.

More information about the tagging API can be found at http://api.reegle.info.


Installation
------------

To configure the API, you'll need to do the following:

1. Register for a key at http://api.reegle.info/register.
2. Fork or download this repository and install into the appropriate CKAN extensions directory. Traditionally, this is at **/usr/lib/ckan/default/src/**.
3. Configure the extension by adding your API key to the configure options in **ckanext-***extension_name***/ckanext/reegletagging/theme/public/ckanext-reegle-tagging.js** like so:
```js
var reegle = {
  apiUrl: 'http://api.reegle.info/service/extract',
  authToken: 'your-auth-token-here!!'
};
```
4. Enable the extension by running the *setup.py*:
```bash
(pyenv)$ python setup.py install
```

More information on extending CKAN available at http://docs.ckan.org/en/latest/extensions/tutorial.html. 
