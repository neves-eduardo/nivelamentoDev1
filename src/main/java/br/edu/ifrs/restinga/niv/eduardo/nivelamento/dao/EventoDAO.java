
package br.edu.ifrs.restinga.niv.eduardo.nivelamento.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import br.edu.ifrs.restinga.niv.eduardo.nivelamento.modelo.Evento;
@Repository

    public interface EventoDAO extends CrudRepository<Evento, Integer> {
}

