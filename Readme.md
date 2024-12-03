# Json transformation to protocol buffers using liquid templates
This is a javascript project for transforming an input json file, using rules configured in a templating engine such as liquid. Once json is transformed, the json is further serialized to protocol buffers, for easier transmission over the network.




# Getting started

### 1. Clone the repo.

### 2. install dependencies
     cd {project_root}
     npm install

### 3. run the code

    For Json to ProtoBuf Translation after running through the liquid engine.
    ```
         node translatorJsonProto.js
    ```

    For ProtoBuf to JsonTranslation.

    ```
        node translatorProtoJson.js
    ```
             


## Input json and template
The input json ,liquid template and protocol buffer template can be found in the {project_root}/resources/ directory.
replace these files if you want to test some other usecase.


