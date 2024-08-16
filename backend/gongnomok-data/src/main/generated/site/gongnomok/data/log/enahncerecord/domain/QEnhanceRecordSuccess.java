package site.gongnomok.data.log.enahncerecord.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QEnhanceRecordSuccess is a Querydsl query type for EnhanceRecordSuccess
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QEnhanceRecordSuccess extends BeanPath<EnhanceRecordSuccess> {

    private static final long serialVersionUID = -101906031L;

    public static final QEnhanceRecordSuccess enhanceRecordSuccess = new QEnhanceRecordSuccess("enhanceRecordSuccess");

    public final NumberPath<Integer> hundred = createNumber("hundred", Integer.class);

    public final NumberPath<Integer> sixty = createNumber("sixty", Integer.class);

    public final NumberPath<Integer> ten = createNumber("ten", Integer.class);

    public QEnhanceRecordSuccess(String variable) {
        super(EnhanceRecordSuccess.class, forVariable(variable));
    }

    public QEnhanceRecordSuccess(Path<? extends EnhanceRecordSuccess> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEnhanceRecordSuccess(PathMetadata metadata) {
        super(EnhanceRecordSuccess.class, metadata);
    }

}

