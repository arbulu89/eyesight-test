"""
Database management code

:author: xarbulu
:organization: SUSE LLC
:contact: xarbulu@suse.com

:since: 2021-03-26
"""

import sqlite3
from sqlite3 import Error

DATABASE = 'db/eye_test.db'

def sql_connection():
    '''
    Connect to the database
    '''
    try:
        conn = sqlite3.connect(DATABASE)
        return conn
    except Error:
        print(Error)

def sql_table(conn):
    '''
    Create the tests table
    '''
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS tests(id integer PRIMARY KEY AUTOINCREMENT,
        date text, eye text, rate1 text, rate2 text, rate3 text,
        rate4 text, rate5 text, rate6 text,rate7 text)""")
    conn.commit()
    conn.close()

def get_entries():
    '''
    Get test entries
    '''
    conn = sqlite3.connect(DATABASE)
    cursor = conn.execute("SELECT * FROM tests order by id desc;")
    data = cursor.fetchall()
    conn.close()
    return data

def insert_entry(data):
    '''
    Insert new test entry
    '''
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    sql = '''INSERT INTO tests (date, eye, rate1, rate2, rate3, rate4, rate5, rate6, rate7)
             VALUES(?,?,?,?,?,?,?,?,?);'''
    cursor.execute(sql, data)
    conn.commit()
    conn.close()

def delete_entry(test_id):
    '''
    Delete test entry
    '''
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    sql = 'DELETE FROM tests WHERE id=?;'
    cursor.execute(sql, [test_id])
    conn.commit()
    conn.close()

def main():
    '''
    Main method
    '''
    conn = sql_connection()
    sql_table(conn)

if __name__ == "__main__":
    main()
