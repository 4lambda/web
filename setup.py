from setuptools import find_packages
from setuptools import setup


def readme() -> str:
    """
    Returns the README file for a long description.
    :returns: Read file as a string.
    """
    with open('README.md') as readme_file:
        return str(readme_file)


setup(
    author='Russell Bunch',
    author_email='rusty@4lambda.io',
    description='Website for 4Lambda.',
    extras_require={
        'ci': [
            'tox',
        ],
        'lint': [
            'flake8',
        ],
        'unit': [
            'pytest',
            'pytest-cov',
        ],
        'server': [
            'uwsgi<=2.0.20',
        ],
    },
    include_package_data=True,
    install_requires=[
        'flask<=2.1.2',
        'flask_bootstrap<=3.3.7.1',
        'flask_scss<=0.5',
    ],
    long_description=readme(),
    name='web',
    license='Apache License 2.0',
    url='https://www.4lambda.io',
    packages=find_packages(),
    version='3.0.0',
    zip_safe=False,
)
