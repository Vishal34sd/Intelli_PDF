

export interface KBChunk {
    namespace : string ,
    source : string ,
    chunkId : number ,
    text : string ,

    //store in mongodb for vector search

    embedding : number[]
}