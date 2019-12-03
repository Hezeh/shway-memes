import React, { useMemo, useState, useRef, useEffect } from 'react'
import { GroupedVirtuoso } from 'react-virtuoso'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import faker from 'faker'
import { groupBy } from 'lodash'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const getUser = () => {
  let firstName = faker.name.firstName()
  let lastName = faker.name.lastName()
  return {
    name: `${firstName} ${lastName}`,
    initials: `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`,
    description: faker.company.catchPhrase(),
    avatar: faker.internet.avatar(),
  }
}

const sortUser = (a, b) => {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

const useGroupedUsers = count => {
  const allUsers = useMemo(
    () =>
      new Array(count)
        .fill(true)
        .map(getUser)
        .sort(sortUser),
    [count]
  )

  const loadedCount = useRef(0)
  const loadedUsers = useRef([])
  const groups = useRef([])
  const [endReached, setEndReached] = useState(false)
  const [groupCounts, setGroupCounts] = useState([])

  const loadMore = () => {
    if (!endReached) {
      setTimeout(() => {
        loadedCount.current += 50

        // in a real world scenario, you would fetch the next
        // slice and append it to the existing records
        loadedUsers.current = allUsers.slice(0, loadedCount.current)

        // the code below calculates the group counts
        // for the users loaded so far;
        // this should be performed on the server too
        const groupedUsers = groupBy(
          loadedUsers.current,
          user => user.name[0]
        )
        groups.current = Object.keys(groupedUsers)
        setGroupCounts(
          Object.values(groupedUsers).map(users => users.length)
        )

        if (loadedCount.current === 500) {
          setEndReached(true)
        }
      }, 500)
    }
  }

  return {
    loadMore,
    endReached,
    groupCounts,
    users: loadedUsers.current,
    groups: groups.current,
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: '8px',
  },
  list: {
    margin: 0,
    padding: 0,
  },
  text: {
    margin: 0,
    padding: '4px 0',
  },
  header: {
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatarPlaceholder: {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    border: `1px solid ${theme.palette.grey[400]}`,
    lineHeight: '40px',
    textAlign: 'center',
  },
}))

export default () => {
  const [isScrolling, setIsScrolling] = useState(false)

  const {
    loadMore,
    endReached,
    groupCounts,
    users,
    groups,
  } = useGroupedUsers(500)

  useEffect(loadMore, [])
  const classes = useStyles()

  return (
    <GroupedVirtuoso
      FooterContainer={({ footerRef, children }) => (
        <ListItem ref={footerRef}>{children}</ListItem>
      )}
      ListContainer={({ listRef, className, style, children }) => {
        return (
          <List
            ref={listRef}
            style={style}
            className={[className, classes.list].join(' ')}
          >
            {children}
          </List>
        )
      }}
      ItemContainer={({ children, ...props }) => {
        return (
          <ListItem {...props} style={{ margin: 0 }}>
            {children}
          </ListItem>
        )
      }}
      GroupContainer={({ children, className, style, ...props }) => (
        <ListSubheader
          {...props}
          className={[className, classes.header].join(' ')}
          disableSticky={true}
          style={{ ...style, marginBottom: 0 }}
        >
          {children}
        </ListSubheader>
      )}
      className={classes.root}
      //style={{ height: '700px', width: '1000px' }}
      groupCounts={groupCounts}
      group={index => <div>Group {groups[index]}</div>}
      endReached={loadMore}
      overscan={400}
      scrollingStateChange={_ => {
        // setIsScrolling(scrolling)
      }}
      item={index => (
        <>
          <ListItemAvatar>
            {isScrolling ? (
              <div className={classes.avatarPlaceholder}>
                {users[index].initials}
              </div>
            ) : (
              <>
                <Avatar
                  alt={`Avatar n°${index + 1}`}
                  src={users[index].avatar}
                />
              </>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={`${users[index].name}`}
            secondary={<span>{users[index].description}</span>}
            className={classes.text}
          />
        </>
      )}
      footer={() => {
        return endReached ? (
          <div>-- end --</div>
        ) : (
          <div>Loading...</div>
        )
      }}
    />
  )
}