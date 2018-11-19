var schema = {
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "minItems": 5,
      "maxItems": 5,
      "items": {
        "type": "object",
        "properties": {
        "id": {
          "type": "integer",
          "initialOffset": 1,
          "autoIncrement": true,
        },
          "fistname": {
            "type": "string",
            "faker": "name.firstName"            
          },
          "lastname": {
            "type": "string",
            "faker": "name.lastName"
          },
          "email": {
            "type": "string",
            "format": "email",
            "faker": "internet.email"
          }
        },
        "required": ["id", "firstname", "lastname", "email"]
      }
    },
    "accidents": {
      "type": "array",
      "minItems": 5,
      "maxItems": 5,
      "items": {
        "type": "object",
        "properties": {
          "lat": {
            "type": "number",
            "minimum": 16.4100,
            "maximum": 16.4150
          },
          "lng": {
            "type": "number",
            "minimum": 120.600,
            "maximum": 120.650
          },
          "user_id": {
            "type": "integer",
            "minimum": 1,
            "maximum": 5,
          },
          "id": {
            "type": "integer",
            "initialOffset": 1,
            "autoIncrement": true,
          },
          "date": {
            "type": "string",
            "format": "soon"
          },
          "images": {
            "type": "array",
            "minItems": 1,
            "maxItems": 3,
            "items": {
              "uri": {
                "type": "string",
                "default": "https://picsum.photos/200/300/?random"
              }
            }
          },
          "description": {
            "type": "string",
            "faker": "lorem.paragraph"
          },
          "title": {
            "type": "string",
            "faker": "lorem.sentence"
          },
          "status": {
            "type": "integer",
            "minimum": 0,
            "maximum": 1,
          }
        },
        "required": ["lat", "lng", "id", "date", "images", "status", "description", "title"]
      }
    },
  },
  "required": ["users", "accidents"]
};

module.exports = schema;