// https://www.shadertoy.com/view/ftGBzK

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
    pct = step(distance(st+sin(u_time*3.14 + cos(u_time * st.y)),vec2(0.4)),distance(st + cos(u_time + sin (u_time * 3.14 * st.x)),vec2(0.7)));
    vec3 color = vec3(pct);
    gl_FragColor = vec4( color, 1.0 );
}
