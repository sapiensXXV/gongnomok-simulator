package site.gongnomok.comment.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.comment.domain.Comment;

import java.util.List;

public interface CommentJpaRepository extends JpaRepository<Comment, Long> {

    void deleteByIdIn(List<Long> ids);
}
