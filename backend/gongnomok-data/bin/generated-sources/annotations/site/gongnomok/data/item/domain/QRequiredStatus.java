package site.gongnomok.data.item.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRequiredStatus is a Querydsl query type for RequiredStatus
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QRequiredStatus extends BeanPath<RequiredStatus> {

    private static final long serialVersionUID = 1562644726L;

    public static final QRequiredStatus requiredStatus = new QRequiredStatus("requiredStatus");

    public final NumberPath<Integer> requiredDex = createNumber("requiredDex", Integer.class);

    public final NumberPath<Integer> requiredInt = createNumber("requiredInt", Integer.class);

    public final NumberPath<Integer> requiredLevel = createNumber("requiredLevel", Integer.class);

    public final NumberPath<Integer> requiredLuk = createNumber("requiredLuk", Integer.class);

    public final NumberPath<Integer> requiredPop = createNumber("requiredPop", Integer.class);

    public final NumberPath<Integer> requiredStr = createNumber("requiredStr", Integer.class);

    public QRequiredStatus(String variable) {
        super(RequiredStatus.class, forVariable(variable));
    }

    public QRequiredStatus(Path<? extends RequiredStatus> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRequiredStatus(PathMetadata metadata) {
        super(RequiredStatus.class, metadata);
    }

}

