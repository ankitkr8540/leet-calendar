<div align='center'>

# NPM Package to show LeetCode-Calendar 

![icon](https://github.com/ankitkr8540/leetcode-calendar/blob/antara-trials/assets/leetcode-calendar-logo.png)

</div>

<p align="center">
    LeetCode Calendar: Because nobody cares about your resume without green squares.
    <br>
    <br>
    Ever tried explaining your coding skills on a resume or portfolio, but felt like it lacked punch? The LeetCode Calendar is here to be your coding trophy wall! This nifty npm package lets you display a sleek calendar showcasing your LeetCode journey. No more scrambling to explain those green squares - impress potential employers (or just your coding buddies) with a visual representation of your dedication and problem-solving consistency. It's like a Fitbit for your coding brain - track your progress, showcase your skills, and maybe even inspire some friendly competition! 
    <br>
    <a href="https://github.com/ankitkr8540/leetcode-calendar/issues/new">Report a Bug or request a feature</a>
</p>

![screenshot](https://github.com/ankitkr8540/leetcode-calendar/blob/antara-trials/assets/demo-screenshot.png)

## Installation

Go to your project folder and do `npm install leetcode-calender`

## Using Leetcode Calender

1. Import leetcode calender in your project

`import LeetCodeCalendar from 'leetcode-calendar';`

2. Use the LeetCodeCalendar component in your JSX code:-

```jsx
<LeetCodeCalendar
  username='your_leetcode_username' // Replace with your LeetCode username
  blockSize={15} // Optional: Size of each block in pixels (default: 15)
  blockMargin={5} // Optional: Margin between blocks in pixels (default: 5)
  color='#c084f5' // Optional: The color of the solved blocks (default: '#c084f5')
  fontSize={16} // Optional: Font size of the text within blocks (default: 16)
  theme={yourThemeObject} // Optional: A custom theme object to style the calendar
  style={{ maxWidth: '1100px' }} // Optional: Inline styles for the calendar container
/>
```

3. Customization

- username: Replace "your_leetcode_username" with your actual LeetCode username.
- blockSize: This defines the size of each block on the calendar in pixels.
- blockMargin: This sets the margin between blocks on the calendar.
- color: Customize the color of the solved blocks on the calendar.
- fontSize: Adjust the font size of the text displayed within each block.
- theme: For advanced customization, you can provide a custom theme object to style the calendar.
- style: Apply inline styles directly to the calendar container.

## Credits

The leetcode calender was designed by [Ankit Kumar](https://github.com/ankitkr8540), [Lingyun Dai](https://github.com/lingyundai), and [Antara Tewary](https://github.com/StringAna).

The logo was designed in [Free Logo Design](https://app.freelogodesign.org/).

## Thank you

Thanks to all the [contributors](https://github.com/ankitkr8540/leetcode-calendar/graphs/contributors) to this project.
