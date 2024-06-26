package site.gongnomok.data.banword.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.data.banword.domain.BanWord;

public interface BanWordRepository extends JpaRepository<BanWord, Long> {
}
