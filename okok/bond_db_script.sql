/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de cr�ation :  4/28/2021 2:11:15 PM                     */
/*==============================================================*/


/*==============================================================*/
/* Table : bond                                                 */
/*==============================================================*/

/*==============================================================*/
/* Table : person                                               */
/*==============================================================*/
create table person
(
   uid                  varchar(254) not null,
   name                 varchar(254),
   username             varchar(254),
   email                varchar(254),
   photo                varchar(254),
   primary key (uid)
);

/*==============================================================*/
/* Table : room                                                 */
/*==============================================================*/
create table room
(
   id                   varchar(254) not null,
   roomname             varchar(254),
   primary key (id)
);

create table bond
(
   room_id              varchar(254) not null,
   person_uid           varchar(254) not null,
   primary key (room_id, person_uid)
);

alter table bond add constraint fk_association foreign key (person_uid)
      references person (uid) on delete restrict on update restrict;

alter table bond add constraint fk_association1 foreign key (room_id)
      references room (id) on delete restrict on update restrict;

