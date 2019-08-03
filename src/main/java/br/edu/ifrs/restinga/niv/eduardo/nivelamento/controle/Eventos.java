
package br.edu.ifrs.restinga.niv.eduardo.nivelamento.controle;

import br.edu.ifrs.restinga.niv.eduardo.nivelamento.modelo.Evento;
import br.edu.ifrs.restinga.niv.eduardo.nivelamento.dao.EventoDAO;
import br.edu.ifrs.restinga.niv.eduardo.nivelamento.dao.ConvidadoDAO;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "/api")
public class Eventos {
    @Autowired
    EventoDAO eventoDAO;
    @Autowired
    ConvidadoDAO convidadoDAO;
    
    
    //CREATE
    @RequestMapping (path = "/eventos", method = RequestMethod.POST)
    public Evento inserir (@RequestBody Evento evento) {
        evento.setId(0);
        eventoDAO.save(evento);
        return evento;
    }
    
    
    //READ
    @RequestMapping (path = "/eventos", method = RequestMethod.GET)
    public Iterable <Evento> listar() {
        return eventoDAO.findAll( );
    }
    
    @RequestMapping(path = "/eventos/{id}", method = RequestMethod.GET)
    public Evento recuperar (@PathVariable int id) {
        Optional<Evento> findByID = eventoDAO.findById(id);
        return findByID.get();
    }
    
    //UPDATE
    @RequestMapping(path="/eventos/{id}", method = RequestMethod.PUT)
    public void atualizar (@PathVariable int id, @RequestBody Evento evento) {
        evento.setId(id);
        eventoDAO.save(evento);
    }
    
    //DELETE
    @RequestMapping(path="/eventos/{id}", method = RequestMethod.DELETE)
    public void apagar (@PathVariable int id) {
        eventoDAO.deleteById(id);
    }
    
    
    
    
    
    
    
    
    
}
