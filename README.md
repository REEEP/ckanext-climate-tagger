ckanext-climate-tagger
======================

The reegle Climate Tagger CKAN Extension provides suggested tags for climate compatible content (for CKAN) by introducing an additional field to the add/edit resource form that displays suggested tags for reegles Tagging API.

Current status: **beta**

More information about the tagging API can be found at http://api.reegle.info.


Install
-------

Fork or download this repository and install into the appropriate CKAN extensions directory. Traditionally, this is at **/usr/lib/ckan/default/src/**.
```
git clone https://github.com/REEEP/ckanext-climate-tagger.git
```

To enable the extension, first activate your CKAN virtualenv:
```bash
$ . /usr/lib/ckan/default/bin/activate
```

Then cd into the extension's top-level directory and run **setup.py**:
```bash
(pyenv)$ cd /usr/lib/ckan/default/src/ckanext-climate-tagger
(pyenv)$ python setup.py develop
```
  *(once configured, you may wish to run `python setup.py install` for production environments)*

And lastly, enable the plugin by adding climate_tagger to ckan.plugins in your CKAN config file, usually development.ini on production.ini in /etc/ckan/default.

More information on extending CKAN available at http://docs.ckan.org/en/latest/extensions/tutorial.html. 

Configure
---------

1. Register for an API token at http://api.reegle.info/register.
2. Configure the extension by adding your API token to the configure options in **ckanext-climate-tagger/ckanext/reegletagging/theme/public/ckanext-reegle-tagging.js** like so:

```js
var reegle = {
  apiUrl: 'http://api.reegle.info/service/extract',
  authToken: 'your-auth-token-here!!'
};
```

License
-------

[CC0 1.0 universal](http://creativecommons.org/publicdomain/zero/1.0/)

