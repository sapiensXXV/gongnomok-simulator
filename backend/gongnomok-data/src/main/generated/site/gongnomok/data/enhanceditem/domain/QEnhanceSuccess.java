package site.gongnomok.data.enhanceditem.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QEnhanceSuccess is a Querydsl query type for EnhanceSuccess
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QEnhanceSuccess extends BeanPath<EnhanceSuccess> {

    private static final long serialVersionUID = 692684784L;

    public static final QEnhanceSuccess enhanceSuccess = new QEnhanceSuccess("enhanceSuccess");

    public final NumberPath<Integer> hundredSuccessCount = createNumber("hundredSuccessCount", Integer.class);

    public final NumberPath<Integer> sixtySuccessCount = createNumber("sixtySuccessCount", Integer.class);

    public final NumberPath<Integer> successCount = createNumber("successCount", Integer.class);

    public final NumberPath<Integer> tenSuccessCount = createNumber("tenSuccessCount", Integer.class);

    public QEnhanceSuccess(String variable) {
        super(EnhanceSuccess.class, forVariable(variable));
    }

    public QEnhanceSuccess(Path<? extends EnhanceSuccess> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEnhanceSuccess(PathMetadata metadata) {
        super(EnhanceSuccess.class, metadata);
    }

}

