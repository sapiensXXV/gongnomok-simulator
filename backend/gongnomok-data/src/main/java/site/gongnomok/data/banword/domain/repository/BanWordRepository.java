package site.gongnomok.data.banword.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.data.banword.domain.BanWord;

/**
 * 금칙어 엔티티에 대한 데이터 접근 인터페이스 입니다.<br>
 * 이 인터페이스는 JpaRepository를 확장하여 금칙어 엔티티에 대한 기본적인 CRUD연산을 제공합니다.<br>
 * <p>JpaRepository를 상속받음으로써 다음과 같은 메서드들을 자동으로 사용할 수 있습니다:</p>
 * <ul>
 *   <li>금칙어 저장: save(BanWord entity)</li>
 *   <li>ID로 금칙어 조회: findById(Long id)</li>
 *   <li>모든 금칙어 조회: findAll()</li>
 *   <li>금칙어 삭제: delete(BanWord entity)</li>
 *   <li>ID로 금칙어 삭제: deleteById(Long id)</li>
 *   <li>금칙어 수 조회: count()</li>
 *   <li>금칙어 존재 여부 확인: existsById(Long id)</li>
 * </ul>
 *
 * @author Jaehoon So
 * @version 1.0.0
 */
public interface BanWordRepository extends JpaRepository<BanWord, Long> {

    Page<BanWord> findAllByOrderByIdDesc(Pageable pageable);
}
