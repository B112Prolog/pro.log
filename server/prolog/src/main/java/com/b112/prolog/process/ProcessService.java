package com.b112.prolog.process;

import com.b112.prolog.process.Dto.ProcessDto;
import com.b112.prolog.process.Dto.Template;
import com.b112.prolog.process.Entity.Process;
import com.b112.prolog.process.Repository.ProcessRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BsonDocument;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class ProcessService {
    private final ProcessRepository processRepository;

    public List<Process> getProcessList() {
        System.out.println("process t");
        List<Process> processList = processRepository.findAll();
        System.out.println(processList);
        return processList;
    }

    public Optional<Process> getProcess(ObjectId oid) {

        Optional<Process> pc = processRepository.findById(oid);
        System.out.println(pc);

        return pc;

    }

    public void updateTemplate(ObjectId oid, String step, int templatetype ){
        String typename ="";   //이건 int Switch용
        switch(step) {
            case "essay":
                typename="서류전형";
                break;
            case "test":
                typename="테스트전형";
                break;
            case "interview":
                typename="면접전형";
                break;
            default :System.out.println("Error");
        }

        Template essayTemplate = new Template(templatetype,typename,null);

        Query q = new Query(Criteria.where("_id").is(oid));
        Update u = new Update();

//        u.set("company","LINE"); //이건 테스트용입니다.
//        u.set("essay",lt);
//        u.addToSet("essay",essayTemplate);

        //서류, 코테 , 면접 Arr (templatename) 중 template 추가
        u.push(step,essayTemplate);

        processRepository.updateTemplate(q,u,Process.class);


    }

    public void updateEssay(ObjectId oid, int templatetype){
        System.out.println(oid+"oid"+templatetype);
        Template essayTemplate = new Template(templatetype,"전형추가",null);
        List<Template> lt = new ArrayList<>();
        lt.add(essayTemplate);
        Optional<Process> asis = processRepository.findById(oid);

        Process updateEssay = Process.builder().company("SK").essay(lt).build();
        updateEssay.setId(oid);
        processRepository.save(updateEssay);



    }

    public void insertProcess(ProcessDto dto){

        Process pcc = Process.builder().company(dto.getCompany()).jd_id(dto.getJd_id()).build();
        System.out.println(pcc);
        processRepository.save(pcc);

    }

    public void updateProcess(ProcessDto dto){
        Process pcc = Process.builder().company(dto.getCompany()).jd_id(dto.getJd_id()).build();
        Document bson = new Document();
        System.out.println(bson+"==========================");
        processRepository.updateProcess(dto,bson);
        System.out.println(bson+"==========================");
        Query q = new Query(Criteria.where("_id").is(dto.getId()));
        Update u = Update.fromDocument(bson);

        processRepository.upsertProcess(q,u,Process.class);



    }


}
