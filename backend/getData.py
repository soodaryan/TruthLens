
















# import flask
# import pymongo
# from pymongo import MongoClient

# def connect_to_mongodb(uri):
#     """
#     Establish a connection to MongoDB using the provided URI.
#     :param uri: MongoDB connection URI
#     :return: MongoDB client instance
#     """
#     try:
#         client = MongoClient(uri)
#         print("Connected to MongoDB")
#         return client
#     except Exception as e:
#         raise Exception(f"Failed to connect to MongoDB: {str(e)}")

# def get_collection(client, database_name, collection_name):
#     """
#     Retrieve a specific collection from a MongoDB database.
#     :param client: MongoDB client instance
#     :param database_name: Name of the database
#     :param collection_name: Name of the collection
#     :return: MongoDB collection instance
#     """
#     try:
#         database = client[database_name]
#         collection = database[collection_name]
#         print(f"Accessed collection: {collection_name}")
#         return collection
#     except Exception as e:
#         raise Exception(f"Failed to access collection: {str(e)}")

# def fetch_one_document(collection):
#     """
#     Fetch the first document from the specified collection.
#     :param collection: MongoDB collection instance
#     :return: A single document from the collection
#     """
#     try:
#         result = collection.find_one({})
#         #print("Fetched document:", result)
#         return result
#     except Exception as e:
#         raise Exception(f"Failed to fetch document: {str(e)}")

# def close_mongodb_connection(client):
#     """
#     Close the connection to MongoDB.
#     :param client: MongoDB client instance
#     """
#     try:
#         client.close()
#         print("MongoDB connection closed")
#     except Exception as e:
#         raise Exception(f"Failed to close MongoDB connection: {str(e)}")

# # Example Usage
# if __name__ == "__main__":
#     URI = "mongodb+srv://Ishan:testingbingo@bingo.bhqrq.mongodb.net/?retryWrites=true&w=majority&appName=Bingo"
#     try:
        
#         client = connect_to_mongodb(URI)

        
#         collection = get_collection(client, "test", "TruthTell")

        
#         document = fetch_one_document(collection)

#         print("Document retrieved:", document)

#         textInput = document['textInput']
#         videoLinks = document['videoLinks']
#         blogLinks = document['blogLinks']
#         videoPaths = document['videoPaths']

#         print(textInput)
#         print(videoLinks)
#         print(blogLinks)
#         print(videoPaths)




#     finally:
#         # Step 5: Close the connection
#         close_mongodb_connection(client)





