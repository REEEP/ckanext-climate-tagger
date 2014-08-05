from setuptools import setup, find_packages
import sys, os

version = '0.1'

setup(
    name='ckanext-reegletagging',
    version=version,
    description="Reegle Tagging API extension for CKAN.",
    long_description='''
    ''',
    classifiers=[], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
    keywords='',
    author='Jay Huggins',
    author_email='jay.huggins@nrel.gov',
    url='http://en.openei.org',
    license='Creative Commons CCZero',
    packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
    namespace_packages=['ckanext', 'ckanext.reegletagging'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        # -*- Extra requirements: -*-
    ],
    entry_points=\
    """
    [ckan.plugins]
    reegle_tagging_api=ckanext.reegletagging.plugin:ReegleTaggingApiPlugin
""",
)
