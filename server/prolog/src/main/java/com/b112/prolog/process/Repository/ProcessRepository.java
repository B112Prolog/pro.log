package com.b112.prolog.process.Repository;

import com.b112.prolog.process.Entity.Process;
import com.b112.prolog.process.Entity.Qna;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProcessRepository extends MongoRepository<Process,String> ,CustomRepository{

}
