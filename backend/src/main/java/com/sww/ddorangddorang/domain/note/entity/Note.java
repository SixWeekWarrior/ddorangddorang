package com.sww.ddorangddorang.domain.note.entity;

import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.room.entity.Room;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private Participant sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    private Participant receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_perform_id")
    private MissionPerform missionPerform;

    private String title;

    // 미리보기 Entity랑 세부내용 Entity랑 나누고 싶은데 일단은 보류
    private String content;
    private String url;

    @Column(name = "is_read")
    private Boolean isRead = false;

//    @CreationTimestamp
    private LocalDateTime createdAt = LocalDateTime.now().plusHours(9L);
    private LocalDateTime deletedAt;

    @Builder
    public Note(Room room, Participant sender, Participant receiver, MissionPerform missionPerform, String title, String content, String url) {
        this.room = room;
        this.sender = sender;
        this.receiver = receiver;
        this.missionPerform = missionPerform;
        this.title = title;
        this.content = content;
        this.url = url;
    }

    public void read() {
        this.isRead = true;
    }

}
