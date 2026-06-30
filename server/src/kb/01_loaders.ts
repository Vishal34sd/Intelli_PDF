

//RAG pipeline mental model
//1 ->  read pdf / text into document[]
//2 -> split -> break large docs into smaller and meaningful chunks -> ABCDE -> chunk0 -> ABC -> chunk1 BCD
//3 -> Embed -> map each and every chunk -> vector(via our gemini embedding model)
//4 -> store -> save vectors + metdata -> vectoDB (mongo atlas)
//5 -> retrives -> for every query that user will ask , fetch relevent chunks by similarity
//6 -> generates -> llm answer using those retrived chunks (context) + original query


import {Document} from "@langchain/core/documents"
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import {TextLoader} from "@langchain/classic/document_loaders/fs/text";



interface LoadFileArgs{
    filePath : string ,
    mimeType : string ,
    originalName : string ,
}

function getExt(name : string ) : string{
    const index = name.lastIndexOf(".")
    return index ===-1 ? "" : name.slice(index + 1).toLowerCase();
}

export async function loadFileAsMime(args : LoadFileArgs) : Promise< Document[]> {

    const {mimeType , filePath , originalName } = args ;
    const extractExt = getExt(originalName)

    //pdf , txt , csv
    const isMarkdown = mimeType ==="text/markdown" || extractExt ==="md" || extractExt === "Markdown";
    const isText = mimeType === "text/plain" || extractExt ==="txt";
    const isPdf = mimeType === "application/pdf" || extractExt === "pdf"

    if(isPdf){
        const loader = new PDFLoader(filePath)
        const docs = await loader.load();

        return docs.map(doc =>({
            ...doc,
            metadata : {
                ...doc.metadata ,
                source : originalName
            }
        }))
    }


    if(isText || isMarkdown){
        const loader = new TextLoader(filePath)
        const docs = await loader.load();

        return docs.map(doc =>({
            ...doc,
            metadata : {
                ...doc.metadata ,
                source : originalName
            }
        }))
    }

    return [] ;
}