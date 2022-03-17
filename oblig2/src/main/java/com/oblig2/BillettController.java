package com.oblig2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    public final List<Billett> alleBilletter = new ArrayList<>();
    public final List<Tittel> alleTitler = new ArrayList<>();

    public BillettController() {
        Tittel tittel1 = new Tittel("The Batman");
        alleTitler.add(tittel1);
        Tittel tittel2 = new Tittel("Ponyo");
        alleTitler.add(tittel2);
        Tittel tittel3 = new Tittel("The Lighthouse");
        alleTitler.add(tittel3);
        Tittel tittel4 = new Tittel("Parasite");
        alleTitler.add(tittel4);
    }

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett){
        alleBilletter.add(innBillett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle(){
        return alleBilletter;
    }

    @GetMapping("/hentTitler")
    public List<Tittel> hentTitler() {
        return alleTitler;
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        alleBilletter.clear();
    }
}

