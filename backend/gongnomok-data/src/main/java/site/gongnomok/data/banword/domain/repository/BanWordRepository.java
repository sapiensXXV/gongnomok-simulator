package site.gongnomok.data.banword.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.gongnomok.data.banword.domain.BanWord;

@Repository
public interface BanWordRepository extends JpaRepository<BanWord, Long> {
}
