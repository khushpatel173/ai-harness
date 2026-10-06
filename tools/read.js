export const readTool = {
        type : "function" , 
        function : {
            name : "read_file" , 
            description: "Read the contents of a file",
            parameters: {
                type : "object" , 
                properties : {
                    path : {
                        type : "string" , 
                        description : "The path of the file to read"
                    }
                } , 
                required : ["path"]
            } , 
            
        }
}