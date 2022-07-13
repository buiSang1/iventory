import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { gql, Apollo } from 'apollo-angular';
import { USERS_DESCRIPTION } from 'src/app/graphql/graphql.user';
import { User } from 'src/app/models/inventory';
import { DialogComponent } from '../dialog/dialog.component';

const Delete_RemoveUser = gql`
  mutation ($idUser: String!) {
    RemoveUser(id: $idUser) {
      _id
      email
      name
      password
      username
    }
  }
`;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  users: User[] = [];
  employee: any[] = [];
  loading = true;
  selectedUserName = '';

  names: string[] = [];
  registerForm: any;
  dialogRef: any;
  constructor(private apollo: Apollo, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: USERS_DESCRIPTION,
      })
      .valueChanges.subscribe((res: any) => {
        this.users = res?.data?.user;
        console.log('data User', res);
      });
  }

  open() {
    this.dialogService
      .open(DialogComponent)
      .onClose.subscribe((name) => name && this.names.push(name));
  }
  RemoveUser(userid: string) {
    this.apollo
      .mutate({
        mutation: Delete_RemoveUser,
        variables: {
          idUser: userid,
        },
      })
      .subscribe((res: any) => {
        this.users = res.data.Delete_RemoveUser;
      });
    console.log('UserID', userid);
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
}
