package site.gongnomok.data.comment.domain.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.data.comment.domain.Comment;

import java.util.List;

public interface CommentJpaRepository extends JpaRepository<Comment, Long> {

    void deleteByIdIn(List<Long> ids);
}
