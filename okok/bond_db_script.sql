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

CREATE DATABASE bond;

\c bond

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table person
(
   id                   uuid default uuid_generate_v4 (),
   name                 varchar(254),
   username             varchar(254) UNIQUE,
   email                varchar(254) UNIQUE,
   photo                varchar(254),
   primary key (id)
);

/*==============================================================*/
/* Table : room                                                 */
/*==============================================================*/
create table room
(
   id                   uuid default uuid_generate_v4 (),
   roomname             varchar(254) UNIQUE,
   primary key (id)
);

create table bond
(
   room_id              uuid,
   person_id           uuid,
   primary key (room_id, person_id),
   foreign key (room_id)
      references room (id),
   foreign key (person_id)
      references person (id)
);
