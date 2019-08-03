
package br.edu.ifrs.restinga.niv.eduardo.nivelamento.modelo;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Evento {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private String localidade;
    @OneToMany (cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn (name = "evento_id")
    private List <Convidado> convidados;
    public List <Convidado> getConvidados() {
        return convidados;
    }

    public void setConvidados(List <Convidado> convidados) {
        this.convidados = convidados;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLocal() {
        return localidade;
    }

    public void setLocal(String localidade) {
        this.localidade = localidade;
    }

}
