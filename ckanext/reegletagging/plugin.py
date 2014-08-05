import logging

import ckan.plugins as plugins
import ckan.plugins.toolkit as tk

log = logging.getLogger(__name__)

class ReegleTaggingApiPlugin(plugins.SingletonPlugin):
    '''REEGLE Tagging API Plugin'''

    plugins.implements(plugins.IConfigurer) # for overriding/customizing builtin templates

    def update_config(self, config):
        tk.add_public_directory(config, 'theme/public')
        tk.add_template_directory(config, 'theme/templates')
        tk.add_resource('theme/public', 'ckanext-reegletagging')
