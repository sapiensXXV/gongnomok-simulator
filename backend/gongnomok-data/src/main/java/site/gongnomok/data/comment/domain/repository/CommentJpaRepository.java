package site.gongnomok.data.comment.domain.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import site.gongnomok.data.comment.domain.Comment;

import java.util.List;

public interface CommentJpaRepository extends JpaRepository<Comment, Long> {

    @Modifying
    @Query("delete from Comment c where c.id in :ids")
    void deleteByIdIn(List<Long> ids);
}
