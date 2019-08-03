
package br.edu.ifrs.restinga.niv.eduardo.nivelamento.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import br.edu.ifrs.restinga.niv.eduardo.nivelamento.modelo.Convidado;
@Repository

    public interface ConvidadoDAO extends CrudRepository<Convidado, Integer> {
}

