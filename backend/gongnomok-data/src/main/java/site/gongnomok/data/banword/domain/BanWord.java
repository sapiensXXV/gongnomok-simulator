package site.gongnomok.data.banword.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class BanWord {

    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "banword_id")
    private Long id;

    private String word;

}
