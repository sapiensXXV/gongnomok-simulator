package site.gongnomok.data.enhanceditem.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QEnhanceStatus is a Querydsl query type for EnhanceStatus
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QEnhanceStatus extends BeanPath<EnhanceStatus> {

    private static final long serialVersionUID = 298473061L;

    public static final QEnhanceStatus enhanceStatus = new QEnhanceStatus("enhanceStatus");

    public final NumberPath<Integer> acc = createNumber("acc", Integer.class);

    public final NumberPath<Integer> avo = createNumber("avo", Integer.class);

    public final NumberPath<Integer> dex = createNumber("dex", Integer.class);

    public final NumberPath<Integer> hp = createNumber("hp", Integer.class);

    public final NumberPath<Integer> intel = createNumber("intel", Integer.class);

    public final NumberPath<Integer> jump = createNumber("jump", Integer.class);

    public final NumberPath<Integer> luk = createNumber("luk", Integer.class);

    public final NumberPath<Integer> mgAtk = createNumber("mgAtk", Integer.class);

    public final NumberPath<Integer> mgDef = createNumber("mgDef", Integer.class);

    public final NumberPath<Integer> move = createNumber("move", Integer.class);

    public final NumberPath<Integer> mp = createNumber("mp", Integer.class);

    public final NumberPath<Integer> phyAtk = createNumber("phyAtk", Integer.class);

    public final NumberPath<Integer> phyDef = createNumber("phyDef", Integer.class);

    public final NumberPath<Integer> str = createNumber("str", Integer.class);

    public QEnhanceStatus(String variable) {
        super(EnhanceStatus.class, forVariable(variable));
    }

    public QEnhanceStatus(Path<? extends EnhanceStatus> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEnhanceStatus(PathMetadata metadata) {
        super(EnhanceStatus.class, metadata);
    }

}

