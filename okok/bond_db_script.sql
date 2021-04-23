/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 8                                  */
/* Date de cr�ation :  4/16/2021 2:25:45 PM                     */
/*==============================================================*/

/*==============================================================*/
/* Table : person                                               */
/*==============================================================*/
create table person (
   uid                  varchar(254)         not null,
   name                 varchar(254)         null,
   email                varchar(254)         null,
   username             varchar(254)         null,
   photo                varchar(254)         null,
   constraint pk_person primary key (uid)
);

/*==============================================================*/
/* Index : user_pk                                              */
/*==============================================================*/
create unique index user_pk on person (
uid
);

/*==============================================================*/
/* Table : socket                                               */
/*==============================================================*/
create table socket (
   person_uid2          varchar(254)         not null,
   person_uid           varchar(254)         not null,
   socketid             varchar(254)         null,
   constraint pk_socket primary key (person_uid2, person_uid)
);

/*==============================================================*/
/* Index : socket_pk                                            */
/*==============================================================*/
create unique index socket_pk on socket (
person_uid2,
person_uid
);

/*==============================================================*/
/* Index : isbondto_fk                                          */
/*==============================================================*/
create  index isbondto_fk on socket (
person_uid2
);

/*==============================================================*/
/* Index : bondsto_fk                                           */
/*==============================================================*/
create  index bondsto_fk on socket (
person_uid
);

alter table socket
   add constraint fk_socket_bondsto_person foreign key (person_uid)
      references person (uid)
      on delete restrict on update restrict;

alter table socket
   add constraint fk_socket_isbondto_person foreign key (person_uid2)
      references person (uid)
      on delete restrict on update restrict;

