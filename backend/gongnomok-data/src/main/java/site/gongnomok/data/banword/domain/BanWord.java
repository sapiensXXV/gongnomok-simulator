package site.gongnomok.data.banword.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class BanWord {

    @Id @GeneratedValue
    @Column(name = "BANWORD_ID")
    private Long id;

    private String word;

}
