from pymongo import MongoClient
from csv import DictReader
from datetime import datetime


CSV_FILEPATH = '../dataset/dataset.csv'

CONNECTION_URI = 'mongodb://root:root@localhost:27017/'

FIELD_NAMES = [
    'id', 'invoiceNumber', 'date', 'storeNumber', 'storeName', 'address', 'city', 'zipCode',
    'storeLocation', 'countyNumber', 'county', 'category', 'categoryName', 'vendorNumber',
    'vendorName', 'itemNumber', 'itemDescription', 'pack', 'bottleVolumeMl', 'stateBottleCost',
    'stateBottleRetail', 'bottlesSold', 'saleDollars', 'volumeSoldLiters', 'volumeSoldGallons'
]

DATABASE_NAME = 'elc137t1db'

COLLECTION_NAME = '2021IowaLiquorSales'


def fix_csv_values_type(rows):
    for row in rows:
        row[FIELD_NAMES[1]] = str(row[FIELD_NAMES[1]])
        row[FIELD_NAMES[2]] = datetime.fromisoformat(row[FIELD_NAMES[2]])
        row[FIELD_NAMES[3]] = str(row[FIELD_NAMES[3]])
        row[FIELD_NAMES[4]] = str(row[FIELD_NAMES[4]])
        row[FIELD_NAMES[5]] = str(row[FIELD_NAMES[5]])
        row[FIELD_NAMES[6]] = str(row[FIELD_NAMES[6]])
        row[FIELD_NAMES[7]] = str(row[FIELD_NAMES[7]])
        row[FIELD_NAMES[8]] = str(row[FIELD_NAMES[8]]) if row[FIELD_NAMES[8]] else None
        row[FIELD_NAMES[9]] = str(row[FIELD_NAMES[9]])
        row[FIELD_NAMES[10]] = str(row[FIELD_NAMES[10]])
        row[FIELD_NAMES[11]] = str(row[FIELD_NAMES[11]])
        row[FIELD_NAMES[12]] = str(row[FIELD_NAMES[12]])
        row[FIELD_NAMES[13]] = str(row[FIELD_NAMES[13]])
        row[FIELD_NAMES[14]] = str(row[FIELD_NAMES[14]])
        row[FIELD_NAMES[15]] = str(row[FIELD_NAMES[15]])
        row[FIELD_NAMES[16]] = str(row[FIELD_NAMES[16]])
        row[FIELD_NAMES[17]] = int(row[FIELD_NAMES[17]])
        row[FIELD_NAMES[18]] = int(row[FIELD_NAMES[18]])
        row[FIELD_NAMES[19]] = float(row[FIELD_NAMES[19]])
        row[FIELD_NAMES[20]] = float(row[FIELD_NAMES[20]])
        row[FIELD_NAMES[21]] = int(row[FIELD_NAMES[21]])
        row[FIELD_NAMES[22]] = float(row[FIELD_NAMES[22]])
        row[FIELD_NAMES[23]] = float(row[FIELD_NAMES[23]])
        row[FIELD_NAMES[24]] = float(row[FIELD_NAMES[24]])

        row.pop(FIELD_NAMES[0])


def read_csv():
    rows = list()

    with open(file=CSV_FILEPATH, mode='r', encoding='utf-8', newline='') as csv_file:
        reader = DictReader(csv_file, delimiter=',', fieldnames=FIELD_NAMES)

        header = next(reader)

        if header:
            for row in reader:
                rows.append(row)
    
    fix_csv_values_type(rows)

    return rows


def drop_database_if_exists(client):
    database_names = client.list_database_names()

    if DATABASE_NAME in database_names:
        client.drop_database(DATABASE_NAME)


def drop_collection_if_exists(database):
    collection_names = database.list_collection_names()

    if COLLECTION_NAME in collection_names:
        database.drop_collection(COLLECTION_NAME)


def main():
    rows = read_csv()

    client = MongoClient(CONNECTION_URI)

    drop_database_if_exists(client)

    database = client[DATABASE_NAME]

    drop_collection_if_exists(database)

    collection = database['sales']

    collection.insert_many(rows)


if __name__ == '__main__':
    main()
