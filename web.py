"""
Web application

:author: xarbulu
:organization: SUSE LLC
:contact: xarbulu@suse.com

:since: 2021-03-26
"""

from flask import Flask, render_template, request, jsonify
import db

app = Flask(__name__)

@app.route("/")
def index():
    '''
    Index route
    '''
    return render_template('index.html')

@app.route("/warmup")
def warmup():
    '''
    Warmup route
    '''
    return render_template('warmup.html')

@app.route("/test", methods=['POST', 'GET'])
def test():
    '''
    Test route
    '''
    if request.method == 'GET':
        return render_template('eye_test.html')
    else:
        request_data = request.get_json()
        new_entry = (
            request_data['date'],
            request_data['eye'],
            request_data['rate1'],
            request_data['rate2'],
            request_data['rate3'],
            request_data['rate4'],
            request_data['rate5'],
            request_data['rate6'],
            request_data['rate7']
        )
        db.insert_entry(new_entry)
        return jsonify(success=True)

@app.route("/test/<test_id>", methods=['DELETE'])
def test_delete(test_id):
    '''
    Delete teste entry
    '''
    db.delete_entry(test_id)
    return jsonify(success=True)

@app.route("/stats")
def stats():
    '''
    Render stats page
    '''
    rows = db.get_entries()
    entries = []
    for row in rows:
        entries.append({
            'id': row[0],
            'date': row[1],
            'eye': row[2],
            'rates': row[3:]
        })

    return render_template('stats.html', entries=entries)

@app.template_filter('eval')
def jinja_eval(value):
    return eval(value)

if __name__ == "__main__":
    app.run()
