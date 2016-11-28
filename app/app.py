from flask import Flask
from flask import render_template
from flask import redirect
from flask import make_response
from flask_bootstrap import Bootstrap
from datetime import datetime
from datetime import timedelta

app = Flask(__name__)
Bootstrap(app)


@app.route('/', methods=['GET'])
def landing():
    return render_template('index.html')


@app.route('/<path:attempt>')
def no(attempt):
    app.logger.debug('Denied attempt for: {0}', attempt)
    return redirect('/', 307)


@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    """Generate sitemap.xml. Makes a list of urls and date modified."""
    pages = []
    ten_days_ago = datetime.now() - timedelta(days=10)
    # static pages
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and len(rule.arguments) == 0:
            pages.append(
                [rule.rule, ten_days_ago]
            )
    sitemap_xml = render_template('sitemap_template.xml', pages=pages)
    response = make_response(sitemap_xml)
    response.headers["Content-Type"] = "application/xml"
    return response


if __name__ == '__main__':
    app.run()
