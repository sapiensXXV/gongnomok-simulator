package site.gongnomok.domain.comment.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.domain.comment.dto.CommentCreateResponse;
import site.gongnomok.domain.comment.dto.CommentCreateServiceDto;
import site.gongnomok.domain.comment.dto.CommentResponse;
import site.gongnomok.global.util.SecurityUtil;

import java.util.List;

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

    @Test
    @DisplayName("아이템 댓글 첫페이지 No Offset")
    void comment_no_offset_first_page() {
        Long itemId = 5L;
        for (int i = 1; i <= 30; i++) {
            commentService.createComment(
                CommentCreateServiceDto.builder()
                    .name("abc" + i)
                    .password("password")
                    .content("testcomment" + i)
                    .build(),
                itemId
            );
        }

        List<CommentResponse> results = commentService.fetchComment(itemId, null, 20);

        assertThat(results).hasSize(20);
        for (CommentResponse result : results) {
            System.out.println(result.getName() + " " + result.getContent());
        }

    }

    @Test
    @DisplayName("아이템 댓글 No Offset")
    void comment_no_offset_page() {

    }

}