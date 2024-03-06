package site.gongnomok.domain.comment.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.domain.comment.dto.CommentCreateResponse;
import site.gongnomok.domain.comment.dto.CommentCreateServiceDto;
import site.gongnomok.global.util.SecurityUtil;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Transactional
class CommentServiceTest {

    @Autowired
    CommentService commentService;

    @Test
    @DisplayName("댓글 생성")
    public void createCommentTest() {

        String USERNAME = "test username";
        String PASSWORD = SecurityUtil.encryptSha256("test password");
        String CONTENT = "test comment content";
        Long ITEM_ID = 5L;

        //given
        String encryptedPassword = SecurityUtil.encryptSha256("test password");
        CommentCreateServiceDto createDto = CommentCreateServiceDto.builder()
            .name(USERNAME)
            .password(PASSWORD)
            .content(CONTENT)
            .build();

        //when
        CommentCreateResponse createResponse = commentService.createComment(createDto, ITEM_ID);

        //then
        assertThat(createResponse.getCommentId()).isNotNull();
        assertThat(createResponse.getName()).isEqualTo(USERNAME);
        assertThat(createResponse.getCreatedDate()).isNotNull();
    }

}