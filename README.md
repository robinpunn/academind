***
***
# MJML Transactional Email

### This project was created with <a href="https://mjml.io">MJML</a>

##### MJML was installed locally with nodejs

---
---

[MJML download instructions](https://mjml.io/download)

---
---

</br>
##### Setting up an mjml project with node
</br>

1. In your project folder, initialize json and install mjml   
 ```npm init -y && npm install mjml```
</br>    

2. Add MJML to path
    ```export PATH="$PATH:./node_modules/.bin"```
</br>

3. Create mjml file
    ``` touch index.mjml ```
</br>

4. Populate mjml file with some code. 
```
        <mjml>
            <mj-head>
                <mj-attributes>
                <mj-text padding="0" />
                <mj-class name="blue" color="blue" />
                <mj-class name="big" font-size="20px" />
                <mj-all font-family="Arial" />
                </mj-attributes>
            </mj-head>
            <mj-body>
                <mj-section>
                <mj-column>
                    <mj-text mj-class="blue big">
                    Hello World!
                    </mj-text>
                </mj-column>
                </mj-section>
            </mj-body>
        </mjml>

```

5. MJML output to html can be viewed on the command line

```
    mjml index.mjml
```
 6. Create an output html file
```
    mjml -r index.mjml -o index.html
```

7.Watch mjml to automatically update html file
```
    mjml --watch index.mjml -o index.html
```
----
----
[MJML Documentation](https://documentation.mjml.io/)

---
---


