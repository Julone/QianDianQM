<script>
import data from "./data2";
export default {
  mounted() {
    // console.log(data);
  },
  components: {
    item: {
      props: {
        json: { required: true }
      },
      components: {
        maps: {
          props: {
            data: {
              required: true
              // default: []
            }
          },
          name: "maps",
          functional: true,
          render(h, ctx) {
            // let result = ctx.slots() ? ctx.slots().default : <a style={el.css}></a>;
            var data = ctx.props.data;
            if (Array.isArray(data) && data.length) {
              return data.map(el => {
                return <maps data={el}></maps>;
              });
            } else {
              if (data.children) {
                return h(
                  data.tag,
                  { style: data.css },
                  <maps data={data.children}></maps>
                );
              } else {
                return h(data.tag, { style: data.css });
              }
            }
          }
        }
      },
      render(h) {
        return (
          <div>
            {this.json.map(el => {
              return (
                <div style={el.css} class={el.className}>
                  <div class="img">
                    <img src={el.css.backgroundImage} width="100%" />
                  </div>
                  <div class="maps">
                    <maps data={el.children}></maps>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    }
  },
  render(h) {
    return (
      <div>
        <item json={data}></item>
      </div>
    );
  }
};
</script>
<style lang="less">
a {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid blue;
}
.item {
  background-position: left top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}
</style>
