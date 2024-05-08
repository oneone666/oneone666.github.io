<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/kjchew-chew.png',
    name: 'KJ Chew',
    title: 'Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/kjchew-chew' }
    ]
  },
  {
    avatar: 'https://www.github.com/jewei.png',
    name: 'Jewei Mak',
    title: 'Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/jewei' },
      { icon: 'twitter', link: 'https://twitter.com/jewei' }
    ]
  },
  {
    avatar: 'https://www.github.com/wymweiss.png',
    name: 'Weiss',
    title: 'Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/wymweiss' }
    ]
  },
]
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="medium" :members="members" />
