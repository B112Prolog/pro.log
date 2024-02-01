package com.b112.prolog.process;

import com.b112.prolog.process.Dto.ProcessDto;
import com.b112.prolog.process.Entity.Process;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProcessController {

    private final ProcessService processService;

    @GetMapping("/process")
    public List<Process> findByAll(){
        System.out.println("HERE");
//        return null;
        return processService.getProcessList();
    }

    @GetMapping("/{processid}")
    public Optional<Process> findProcess(@PathVariable ObjectId processid){
        System.out.println(processid+"oid cont");
        return processService.getProcess(processid);
    }

    @PostMapping("/process")
    public int insertProcess(@RequestBody ProcessDto dto){
        //ProcessDto pc = processService.insertProcess(dto);
        processService.insertProcess(dto);
        return 1;
    }

}